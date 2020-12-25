var reverse = function(x) {
    let res = 0, sym = 0
    // x < 0
    if(x < 0) {
        sym = 1
        x = 0 - x
    }

    // x > 0
    while(x) {
        res = res * 10 + x % 10
        x = Math.floor(x / 10)
    }
    res = sym === 1 ? Math.max(-res, -2^31) : Math.min(res, 2^31)
    
    return res
}
