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

// goal
// - Basically, you want to try and "cover" as much rows as you can
// - to "cover" a row, you need to have all the 1s in the row within the column you've selected

// ex:
// mat = [[1,0,1], [1,1,0]]
// col = 2 which means you can select 2 columns
// to cover mat[0], you'd need to select columns 0 and 2
// to cover mat[1], you'd need to select columns 0 and 1
// because you can only select two columns, you won't be able to cover mat[0] and mat[1]
// but you can cover 1 of them so the answer is 1

// ex
// mat = [[1,0,1], [0,0,1], [1,0,0], [1,0,0]]
// col = 1 which means you can only select 1 column
// possible columns [0,0,1], [0,1,0], [1,0,0]
// [0,0,1] will result in mat[1] being covered so count is 1
// [0,1,0] will result in 0 rows covered so count is 0
// [1,0,0] will result in mat[2] and mat[3] being covered so count is 2
// best count seen is 2 so answer is 2

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
            generate([...colsDp, 'a'], count+1)
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