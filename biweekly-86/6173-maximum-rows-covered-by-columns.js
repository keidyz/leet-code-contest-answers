// You are given a 0-indexed m x n binary matrix mat and an integer cols, which denotes the number of columns you must choose.
// A row is covered by a set of columns if each cell in the row that has a value of 1 also lies in one of the columns of the chosen set.
// Return the maximum number of rows that can be covered by a set of cols columns.

/**
 * @param {number[][]} mat
 * @param {number} cols
 * @return {number}
 */

// 1 0 1
// 0 1 1
// 0 1 1
// col = 2


// DP idea
// - generate possible column variations
//  - [b,a,a] representing [0,1,1] with row[1] and row[2] as the two chosen columns
//  - generated columns -> [a,a,b], [a,b,a], [b,a,a]
// - from the generated columns, go through each row in the matrice
//  - go through each item in the row from right to left and follow the following rules
//   - if row[x] is a 1, turn it to 'a' if col[x] is 'a' and the item next to it is an 'a', else it'd be a b
//  - once the entire row is done, you'd know if the row is covered if row[a] is 'a'
// - rinse and repeat


var maximumRows = function(mat, cols) {
    const res = []
    const generate = (colsDp = [], count = 0) => {
        if(colsDp.length === mat[0].length && count === cols) {
            res.push(colsDp)
            return
        }
        if(colsDp.length > mat[0].length) {
            return
        }
        if(count < cols) {
            backtrack([...colsDp, 'a'], count+1)
        }
        generate([...colsDp, 'b'], count)
    }
    generate()
    let best = -Infinity
    for(const r of res) {
        let currCount = 0
        const tempGrid = JSON.parse(JSON.stringify(mat))
        for(let y = tempGrid.length - 1; y >= 0; y--) {
            const row = tempGrid[y]
            for(let x = tempGrid[0].length - 1; x >= 0; x--) {
                if(row[x] === 1) {
                    row[x] = r[x] === 'a' ? (x >= tempGrid[0].length-1 ? 'a' : row[x+1]) : 'b'
                    continue
                }
                row[x] = x >= tempGrid[0].length-1 ? 'a' : row[x+1]
            }
            if(row[0] === 'a') {
                ++currCount
            }
        }
        best = Math.max(currCount, best)
    }
    return best
};