function fn() {
    console.log(this);
    function fn2(){
        console.log(this);
    }
    let ret = fn2.bind(this);
    ret();
}


let obj = {
    name : 'ABC',
    fn: fn
}

obj.fn();

console.log()
