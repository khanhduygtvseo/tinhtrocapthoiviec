param([string]$OutDir = "C:\Claude code\careerviet-web2-wine\_anh-duyet")
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$tmp = Join-Path $env:TEMP "wine-render"
New-Item -ItemType Directory -Force $tmp, $OutDir | Out-Null
foreach ($line in Get-Content (Join-Path $here "list.txt")) {
  $n, $w, $h = $line.Split('|')
  $svgPath = (Join-Path $here "svg\$n.svg")
  $html = Join-Path $tmp "$n.html"
  $svgUri = "file:///" + ($svgPath -replace '\\','/')
  Set-Content -LiteralPath $html -Encoding utf8 -Value "<!doctype html><html><body style='margin:0;background:#000'><img src='$svgUri' width='$w' height='$h' style='display:block'></body></html>"
  $png = Join-Path $OutDir "$n.png"
  & $chrome --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --allow-file-access-from-files --virtual-time-budget=3000 --window-size="$w,$h" "--screenshot=$png" ("file:///" + ($html -replace '\\','/')) | Out-Null
}
Get-ChildItem $OutDir -Filter *.png | Select-Object Name, Length
