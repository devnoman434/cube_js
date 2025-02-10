class Cube {
    constructor() {
        this.faces = {
            U: Array(4).fill('W'), // White
            D: Array(4).fill('Y'), // Yellow
            F: Array(4).fill('G'), // Green
            B: Array(4).fill('B'), // Blue
            L: Array(4).fill('O'), // Orange
            R: Array(4).fill('R')  // Red
        };
    }

    rotateFace(face) {
        const f = this.faces[face];
        [f[0], f[1], f[2], f[3]] = [f[2], f[0], f[3], f[1]];
    }

    rotateR() {
        const { U, F, D, B } = this.faces;
        [U[1], U[3], D[1], D[3], B[0], B[2], F[1], F[3]] = 
        [F[1], F[3], B[2], B[0], U[1], U[3], D[1], D[3]];
        this.rotateFace('R');
    }

    rotateU() {
        const { F, L, B, R } = this.faces;
        [F[0], F[1], R[0], R[1], B[0], B[1], L[0], L[1]] = 
        [R[0], R[1], B[0], B[1], L[0], L[1], F[0], F[1]];
        this.rotateFace('U');
    }

    rotateF() {
        const { U, R, D, L } = this.faces;
        [U[2], U[3], R[0], R[2], D[0], D[1], L[1], L[3]] = 
        [L[3], L[1], U[2], U[3], R[2], R[0], D[1], D[0]];
        this.rotateFace('F');
    }

    isSolved() {
        for (const face of Object.values(this.faces)) {
            if (!face.every((color, _, arr) => color === arr[0])) {
                return false;
            }
        }
        return true;
    }

    scramble() {
        const moves = ['R', 'U', 'F'];
        for (let i = 0; i < 20; i++) {
            const move = moves[Math.floor(Math.random() * moves.length)];
            this[`rotate${move}`]();
        }
    }

    solve() {
        // Placeholder for solving logic
        while (!this.isSolved()) {
            this.rotateR();
            this.rotateU();
            this.rotateF();
        }
    }
}

// Render the cube
function renderCube(cube) {
    const container = document.getElementById('cube-container');
    container.innerHTML = '';
    for (const [face, colors] of Object.entries(cube.faces)) {
        const faceDiv = document.createElement('div');
        faceDiv.className = 'face';
        faceDiv.id = face;
        colors.forEach(color => {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.style.backgroundColor = getColorCode(color);
            faceDiv.appendChild(cell);
        });
        container.appendChild(faceDiv);
    }
}

// Map color codes
function getColorCode(color) {
    switch (color) {
        case 'W': return 'white';
        case 'Y': return 'yellow';
        case 'G': return 'green';
        case 'B': return 'blue';
        case 'O': return 'orange';
        case 'R': return 'red';
        default: return 'black';
    }
}

// Initialize the cube
const cube = new Cube();
renderCube(cube);

// Event listeners
document.getElementById('scramble-btn').addEventListener('click', () => {
    cube.scramble();
    renderCube(cube);
});

document.getElementById('solve-btn').addEventListener('click', () => {
    cube.solve();
    renderCube(cube);
});