import sys
def two_sum(nums, target):
    # Key: number, Value: index
    num_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    return []  # no solution
def main():
    data = sys.stdin.read().strip().split()
    
    n = int(data[0])
    nums = list(map(int, data[1:1+n]))
    target = int(data[1+n])
    result = two_sum(nums, target)
    if result:
        print(f"[{result[0]},{result[1]}]",end="")
    else:
        print("[]",end='')
if __name__ == "__main__":
    main()