<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}}</title>
    <style>
        body {
            margin: 30px;
        }
        a {
            display: block;
            font-size: 20px;
            color: #333;
            margin-bottom: 8px;
        }
        img {
            margin-right:10px;
            position: relative;
            top: 4px;
        }
    </style>
</head>
<body>
    {{#each files}}
        <a href="{{../dir}}/{{file}}">
            <img src="{{icon.image}}" width="20" height="20"/>
            {{file}}
        </a>
    {{/each}}
</body>
</html>
