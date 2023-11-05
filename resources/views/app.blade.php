<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>100Fila</title>
</head>
<body>

<div id="root"></div>
    
@viteReactRefresh
@vite('resources/js/app.js')

</body>
</html>