var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

// create picture
var img = new Image()
img.src = 'img/bird.jpg'
// 这里无法直接修改图片的大小，只能通过drawImage改变
// let imgSty = img.style
// imgSty.width = "30px"
// imgSty.height = "30px"
// console.log('img', img);

// 动画
let birdX = 20, birdY = 20, birdWidth = 30, birdHeight = 30
let birdTime = null

// 图片总是异步加载的
img.onload = function() {
    // 等待图片加载之后才进行的一些操作
    
    birdTime = setInterval(() => {
        // canvas每次都是在上一次绘制的基础上绘制的
        // 所以需要清空画布(先清空再绘制，不是先绘制再清空)
        context.clearRect(0, 0, 500, 400)

        // 绘制图片
        context.drawImage(img, birdX, birdY, birdWidth, birdHeight)
        if(birdY <= (500 - birdHeight)) {
            birdY++
        }
        
    }, 10);

    // 点击任意位置
    document.onclick = function() {
        birdY = birdY - 30
    }

}



