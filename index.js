/** Snake Game */

function create_array(length) {
    const array = [];
    for (let i = 0; i < length; i++) array[i] = 0;
    return array;
}

class EventEmitter{
    subscribers = {};
    on(event, callbackfn) {
        if (!Array.isArray(this.subscribers[event])) this.subscribers[event] = [];
        this.subscribers[event].push(callbackfn);
    }
    emit(event, data) {
        for (const callbackfn of this.subscribers[event]) callbackfn(data);
    }
}

class SnakeGame extends EventEmitter{
    constructor(width = 10, height = 10, basic_length = 2) {
        this.table = [];
        this.width = width % 2 === 1 ? width : width + 1;
        this.height = height % 2 === 1 ? height : height + 1;
        this.basic_length = basic_length;
        /** SNAKE PROPERTY */
        this.snake_length = this.basic_length;
        this.snake_direction = "T";
        /** CREATE GAME MAP */
        this.map = create_array(this.height).map(i => create_array(this.width));
        /** INIT */
        const w_center = Math.round(this.width / 2) - 1;
        const h_center = Math.round(this.height / 2) - 1;
        this.map[h_center][w_center] = 2;
        for (let i = 0; i < this.snake_length; i++) this.map[h_center + i + 1][w_center] = 1;
    }
    go_left() {
        if (this.snake_direction === "T") this.snake_direction = "L";
        if (this.snake_direction === "L") this.snake_direction = "B";
        if (this.snake_direction === "B") this.snake_direction = "R";
        if (this.snake_direction === "R") this.snake_direction = "T";
    }
    go_right() {
        if (this.snake_direction === "T") this.snake_direction = "R";
        if (this.snake_direction === "R") this.snake_direction = "B";
        if (this.snake_direction === "B") this.snake_direction = "L";
        if (this.snake_direction === "L") this.snake_direction = "T";
    }
    start(username, iteration_time = 1000) {
        const game = () => {
            const snake_position_y = this.map.findIndex(i => i.includes(2));
            const snake_position_x = this.map[snake_position_y].findIndex(i => i === 2);
            if (this.snake_length < this.basic_length) {
                const game_results = { username, score: this.snake_length };
                this.table.push(game_results);
                this.emit("gameover", game_results);
            }
            if (this.snake_direction === "T") {
                this.map[snake_position_y - 1][snake_position_x] = 2;
                for (let i = 0; i < this.snake_length; i++) {
                    if (i === 0) this.map[snake_position_y][snake_position_x] = 1;
                }
            }
            console.log(this.map);
            setTimeout(game, iteration_time);
        }
        game();
    }
}
