// Given a 0-indexed integer array nums, determine whether there exist two subarrays of length 2 with equal sum. Note that the two subarrays must begin at different indices.
// Return true if these subarrays exist, and false otherwise.
// A subarray is a contiguous non-empty sequence of elements within an array.

/**
 * @param {number[]} nums
 * @return {boolean}
 */
// go through every array and store sum to cache
var findSubarrays = function(nums) {
    const cache = {}
    for(let x = 1; x < nums.length; x++) {
        const sum = nums[x-1] + nums[x]
        if(cache[sum]) {
            return true
        }
        cache[sum] = true
    }
    return false
};