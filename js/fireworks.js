var fireworks = [];
var tick = 0;
noisy.seed(Math.random());

function Particle(position, direction, vel, radius, explode){
    this.position = createVector(position.x, position.y);
    this.direction = direction;
    this.vel = vel;
    this.radius = radius;
    this.explode = explode;

    this.velocity = createVector(
        Math.cos(this.direction) * this.vel,
        Math.sin(this.direction) * this.vel
    );
    this.friction = 0.9;
    this.gravity =  this.radius * 0.01;
    this.decay =  randomBetween(90, 91) * 0.01;
}

Particle.prototype.updateParticle = function(){
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
    this.velocity.y += this.gravity;
    this.vel *= this.friction;
    
    this.radius *= this.decay;
    this.gravity += 0.05;
}



function createFireworks(position_x, position_y){
    var particles = [];
    var numOfParticles = 50;
    var i = 0;
    var angle = 0;
    while(i < numOfParticles){
        var position = createVector(position_x, position_y);
        var direction = direction = Math.random() * TWO_PI;
        var vel = randomBetween(10, 20);
        var radius = 10 + (Math.random() * 20);;
        var explode = true;

        particles[i] = new Particle(
            position,
            direction,
            vel,  //合速度的大小
            radius,
            explode
        );
        i++;

        // console.log("------"+i+"-------");
        // console.log("position.x = "+particles[i-1].position.x+", position.y = "+particles[i-1].position.y);
        // console.log("direction = "+particles[i-1].direction);
        // console.log("vel = "+particles[i-1].vel);
        // console.log("radius = "+particles[i-1].radius);
    }
    fireworks.push(particles);
}

function createFireworks2(position_x, position_y){
    var particles = [];
    var numOfParticles = 50;
    var i = 0;
    var angle = 0;
    while(i < numOfParticles){
        var position = createVector(position_x, position_y);
        var direction = angle;
        angle = angle + TWO_PI/numOfParticles;
        var vel = 5 + (i%4)*3;
        var radius = 20;
        var explode = true;

        particles[i] = new Particle(
            position,
            direction,
            vel,  //合速度的大小
            radius,
            explode
        );
        i++;

        // console.log("------"+i+"-------");
        // console.log("position.x = "+particles[i-1].position.x+", position.y = "+particles[i-1].position.y);
        // console.log("direction = "+particles[i-1].direction);
        // console.log("vel = "+particles[i-1].vel);
        // console.log("radius = "+particles[i-1].radius);
    }
    fireworks.push(particles);
}



function updateFireworks(ctx){
    clearFirework(ctx);
    
    for(var i = 0; i < fireworks.length; i++){
        var particles = fireworks[i];
       // console.log(i+",fireworks");
        for(var j = 0; j < particles.length; j++){

            ctx.beginPath();
            var h = (noisy.perlin2(tick, tick) * 360);
		    var fill = `hsl(${h}, 80%, 50%)`;
            ctx.fillStyle = fill;
            //ctx.fillStyle = "blue";
            ctx.arc(particles[j].position.x, particles[j].position.y, particles[j].radius, 0, TWO_PI);
            ctx.fill();
            ctx.closePath();  

            particles[j].updateParticle();

            if(Math.abs(particles[j].radius) <=2 && particles[j].explode){
                particles[j].explode = false;
                var children = 10;
                var angle = 0;
                while(children--){
                    particles.push(
                        new Particle(
                        createVector(particles[j].position.x, particles[j].position.y),
                        // Math.random() * TWO_PI, //direction
                        angle,
                        particles[j].vel * (randomBetween(2, 5)), //vel
                        particles[j].radius * 4, //radius
                        false //explode
                    ));

                    angle = angle + TWO_PI/children;
                }
            }

            if(particles[j].radius <= 0.1 || particles[j].vel <= 0.1){
                particles.splice(j,1);
            }
            //console.log("particles.length = "+particles.length);
        }
    }
    tick += 0.01;
}

function clearFirework(ctx){
    ctx.globalCompositeOperation = 'destination-atop';
	ctx.fillStyle = 'hsla(0, 0%, 0%, 0)';
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.globalCompositeOperation = 'lighter';

}

function randomBetween(min, max){
    return Math.random() * (max - min + 1) + min;
}


