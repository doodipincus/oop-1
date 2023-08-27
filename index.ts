class Rectangle {
    width: number
    hight: number
    color: string | undefined

    constructor(width: number, hight: number, color: string | undefined = undefined) {
        this.width = width
        this.hight = hight
        this.color = color
    }
    area(): number {
        return this.width * this.hight
    }

    info(): string {
        return 'This is a Recktangle'
    }

    coloredRectangle(color: string): string {
        this.color = color
        return `This is a Recktangle in color ${this.color}`
    }
}

class Square extends Rectangle {
    lengthOfTheSide: number

    constructor(lengthOfTheSide: number) {
        super(lengthOfTheSide, lengthOfTheSide)
        this.lengthOfTheSide = lengthOfTheSide
    }
}

class Shape {
    draw(): void {
        console.log('drawing a shape');
    }
}

class Triangle extends Shape {
    draw(): void {
        console.log('Triangle');

    }
}
class Circle extends Shape {
    draw(): void {
        console.log('Circle');
    }
}
class Square2 extends Shape {
    draw(): void {
        console.log('Square2');
    }
}

function renderShapes(list: Shape[]): void {
    list.forEach(element => {
        element.draw()
    });
}

// const rec1 = new Shape(2, 8)
// console.log(rec1.info())

// const rec2 = new Rectangle(2, 8)
// console.log(rec2.area());
// console.log(rec2.coloredRectangle('red'));

const s1 = new Shape()
// s1.draw()
const s2 = new Triangle()
// s2.draw()
const s3 = new Circle()
// s3.draw()
const s4 = new Square2()
// s4.draw()
const data = [s1, s2, s3, s4]
renderShapes(data)