
let score = 0,
    scoreID=document.getElementById('sc')
    tr = 1,
    canvas = document.getElementById('game'),
    context = canvas.getContext('2d'),
    grid = 18,
    paddleWidth = grid,
    paddleHeight = grid * 12,
    ballSpeed = 3,
    ball = {
        x: canvas.width / 2 - grid / 2,
        y: canvas.height / 2 - grid / 2,
        width: grid,
        height: grid,
        dx: ballSpeed * (Math.random() + 1),
        dy: ballSpeed * (Math.random() + 1)
    }
let paddleSpeed = Math.abs(ball.dy) + 1,
    leftPaddle = {
        x: 2 * grid,
        y: canvas.height / 2 - paddleHeight / 2,
        width: paddleWidth,
        height: paddleHeight,
        dy: 0
    },
    rightPaddle = {
        x: canvas.width - 3 * grid,
        y: canvas.height / 2 - paddleHeight / 2,
        width: paddleWidth,
        height: paddleHeight/2
    }

function collides(obj1, obj2) {
    return obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
}
if (Math.round(Math.random())) {
    ball.dx *= -1
}
if (Math.round(Math.random())) {
    ball.dy *= -1
}

function pop(){
    aud=new Audio()
    aud.src='pop.mp3'
    aud.autoplay=true
}

function loop() {
    requestAnimationFrame(loop)
    if (ball.x >= grid * 3 && ball.x + grid <= canvas.width - grid * 3) {
        tr = 1
    }

    scoreID.textContent='Score: '+score
    leftPaddle.y += leftPaddle.dy
    ball.x += ball.dx
    ball.y += ball.dy

    if (collides(leftPaddle, ball) && tr) {
        ball.dx *= -1
        pop()
        tr = 0
        score +=1
    }
    else if (collides(rightPaddle, ball) && tr) {
        ball.dx *= -1
        pop()
        tr = 0
    }

    if (ball.y <= grid || ball.y + grid >= canvas.height - grid) {
        ball.dy *= -1
        pop()
    }


    context.clearRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = 'white'

    context.fillRect(leftPaddle.x, leftPaddle.y + leftPaddle.dy, leftPaddle.width, leftPaddle.height)
    context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height)

    context.fillRect(0, 0, canvas.width, grid)
    context.fillRect(0, 0, grid, canvas.width)
    context.fillRect(0, canvas.height - grid, canvas.width, grid)
    context.fillRect(canvas.width - grid, 0, grid, canvas.width)

    context.fillRect(ball.x, ball.y, ball.width, ball.height)


    if (leftPaddle.y <= grid) {
        leftPaddle.y = grid
    }
    if (leftPaddle.y >= canvas.height - grid - paddleHeight) {
        leftPaddle.y = canvas.height - grid - paddleHeight
    }

    document.addEventListener('keydown', function (e) {
        if (e.which == 38) {
            leftPaddle.dy = -paddleSpeed
        }
        if (e.which == 40) {
            leftPaddle.dy = paddleSpeed
        }
    })
    rightPaddle.y=ball.y-paddleHeight/4+grid/2
    if (ball.x <= grid) {
        alert(`You lose.
Your score: `+String(score))
        score=0
        ball = {
            x: canvas.width / 2 - grid / 2,
            y: canvas.height / 2 - grid / 2,
            width: grid,
            height: grid,
            dx: ballSpeed * (Math.random() + 1),
            dy: -ballSpeed * (Math.random() + 1)
        }
        paddleSpeed = Math.abs(ball.dy) + 1
        leftPaddle = {
            x: 2 * grid,
            y: canvas.height / 2 - paddleHeight / 2,
            width: paddleWidth,
            height: paddleHeight,
            dy: 0
        }
        rightPaddle = {
            x: canvas.width - 3 * grid,
            y: canvas.height / 2 - paddleHeight / 2,
            width: paddleWidth,
            height: paddleHeight/2
        }

        if (Math.random()) {
            ball.dx *= -1
        }
        if (Math.random()) {
            ball.dy *= -1
        }
    }
}
requestAnimationFrame(loop)