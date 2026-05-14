#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;
vector<int> twoSum(vector<int>& nums, int target) {
    // Key: the number, Value: its index
    unordered_map<int, int> numMap;
    
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        
        // If complement exists in our map, we found the pair
        if (numMap.find(complement) != numMap.end()) {
            return {numMap[complement], i};
        }
        
        // Otherwise, add current number and its index to the map
        numMap[nums[i]] = i;
    }
    
    return {}; // Return empty if no solution is found
}
int main() {
    int target,n;
	cin>>n;
vector<int> nums(n);
for (int i = 0; i < n; i++) {
    cin >> nums[i];
}
	cin>>target;
    
    vector<int> result = twoSum(nums, target);
    
    if (!result.empty()) {
        cout << "[" << result[0] << "," << result[1] << "]";
    } else {
        cout << "[]";
    }
    
    return 0;
}