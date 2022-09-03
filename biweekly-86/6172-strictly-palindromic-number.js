// An integer n is strictly palindromic if, for every base b between 2 and n - 2 (inclusive), the string representation of the integer n in base b is palindromic.
// Given an integer n, return true if n is strictly palindromic and false otherwise.
// A string is palindromic if it reads the same forward and backward.

/**
 * @param {number} n
 * @return {boolean}
 */
 var isStrictlyPalindromic = function(n) {
    for(let z = 2; z <= n-2; z++) {
       const binary = Number(n).toString(z)
        let x = 0
        let y = binary.length - 1
        while(x < y) {
            if(binary[x] !== binary[y]) {
                return false
            }
            ++x
            --y
        }
    }
    return true 
};