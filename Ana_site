<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quadro de Ideias</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            background-color: #F8E8EE;
            color: #6D597A;
        }
        h1 {
            font-size: 24px;
        }
        canvas {
            border: 2px solid #FFC8DD;
            background-color: #FAF3F0;
            cursor: pointer;
            border-radius: 10px;
        }
        .button-container, .options-container {
            margin-top: 10px;
        }
        button {
            background-color: #FFAFCC;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            color: white;
            transition: 0.3s;
        }
        button:hover {
            background-color: #FF90B3;
        }
        select, input {
            padding: 5px;
            border-radius: 5px;
            border: 1px solid #6D597A;
        }
    </style>
</head>
<body>
    <h1>Quadro de Ideias</h1>
    <label>Nome de utilizador: <input type="text" id="username" placeholder="Digite seu nome"></label>
    <canvas id="board" width="800" height="500"></canvas>
    
    <div class="options-container">
        <label>Cor do texto:
            <select id="textColor">
                <option value="black">Preto</option>
                <option value="white">Branco</option>
            </select>
        </label>
        <label>Cor do sticker:
            <select id="stickerColor">
                <option value="#D8BFD8">Lilás</option>
                <option value="#FFC8DD">Rosa Claro</option>
                <option value="#FF90B3">Rosa Escuro</option>
                <option value="#FDFD96">Amarelo Pastel</option>
                <option value="#B5EAD7">Verde Pastel</option>
                <option value="#A0C4FF">Azul Pastel</option>
                <option value="#8B0000">Vermelho Sangue</option>
            </select>
        </label>
    </div>
    
    <div class="button-container">
        <button onclick="clearBoard()">Limpar Quadro</button>
    </div>
    
    <script>
        const canvas = document.getElementById("board");
        const ctx = canvas.getContext("2d");
        const socket = new WebSocket("wss://SEU_SERVIDOR_AQUI");
        const usernameInput = document.getElementById("username");
        const textColorSelect = document.getElementById("textColor");
        const stickerColorSelect = document.getElementById("stickerColor");

        ctx.font = "20px Arial";
        ctx.fillStyle = "#6D597A";
        
        canvas.addEventListener("click", (e) => {
            const username = usernameInput.value.trim() || "Anônimo";
            const word = prompt("Escreve uma palavra ou deixa vazio para um sticker:");
            const x = e.clientX - canvas.offsetLeft;
            const y = e.clientY - canvas.offsetTop;
            const textColor = textColorSelect.value;
            const stickerColor = stickerColorSelect.value;

            if (word) {
                ctx.fillStyle = textColor;
                ctx.fillText(`${username}: ${word}`, x, y);
                socket.send(JSON.stringify({ username, word, x, y, textColor }));
            } else {
                ctx.fillStyle = stickerColor;
                ctx.fillRect(x - 25, y - 15, 50, 30);
                ctx.strokeRect(x - 25, y - 15, 50, 30);
                socket.send(JSON.stringify({ username, sticker: true, x, y, stickerColor }));
            }
        });

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.sticker) {
                ctx.fillStyle = data.stickerColor;
                ctx.fillRect(data.x - 25, data.y - 15, 50, 30);
                ctx.strokeRect(data.x - 25, data.y - 15, 50, 30);
            } else {
                ctx.fillStyle = data.textColor;
                ctx.fillText(`${data.username}: ${data.word}`, data.x, data.y);
            }
        };
        
        function clearBoard() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    </script>
</body>
</html>
