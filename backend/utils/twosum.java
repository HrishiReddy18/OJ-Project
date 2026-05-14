import java.util.*;
public class Main {
    public static int[] twoSum(int[] nums, int target) {
        // Key: number, Value: index
        HashMap<Integer, Integer> numMap = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            // Check if complement exists
            if (numMap.containsKey(complement)) {
                return new int[]{numMap.get(complement), i};
            }
            // Store current number and index
            numMap.put(nums[i], i);
        }
        return new int[]{}; // no solution
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = sc.nextInt();
        }
        int target = sc.nextInt();
        int[] result = twoSum(nums, target);
        if (result.length != 0) {
            System.out.print("[" + result[0] + "," + result[1] + "]");
        } else {
            System.out.print("[]");
        }
        sc.close();
    }
}