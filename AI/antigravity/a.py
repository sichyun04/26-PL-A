def calculate_mean_and_variance(numbers):
    """
    정수 리스트를 입력받아 평균과 분산을 계산하는 함수
    """
    try:
        if not numbers:
            raise ValueError("리스트가 비어있습니다.")
        
        n = len(numbers)
        
        # 평균 (Mean) 계산
        mean = sum(numbers) / n
        
        # 분산 (Variance) 계산 - 모분산(Population Variance) 기준
        # 표본분산(Sample Variance)을 구하려면 분모를 (n - 1)로 나누면 됩니다.
        variance = sum((x - mean) ** 2 for x in numbers) / n
        
        return mean, variance

    except TypeError:
        raise TypeError("리스트에 숫자가 아닌 형식이 포함되어 있거나 올바른 입력이 아닙니다.")
    except Exception as e:
        raise Exception(f"계산 중 오류가 발생했습니다: {e}")

if __name__ == "__main__":
    # 정상 작동 테스트
    sample_data = [1, 2, 3, 4, 5]
    mean, variance = calculate_mean_and_variance(sample_data)
    
    print("--- 정상 데이터 테스트 ---")
    print(f"데이터: {sample_data}")
    print(f"평균: {mean}")
    print(f"분산: {variance}\n")

    print("--- 예외 처리 테스트 ---")
    # 1. 빈 리스트가 들어왔을 때 (ValueError)
    try:
        calculate_mean_and_variance([])
    except Exception as e:
        print(f"[] 입력 시 예외 발생: {type(e).__name__} - {e}")

    # 2. 문자열 등 숫자가 아닌 값이 섞여있을 때 (TypeError)
    try:
        calculate_mean_and_variance([1, 2, 'three', 4, 5])
    except Exception as e:
        print(f"[1, 2, 'three', 4, 5] 입력 시 예외 발생: {type(e).__name__} - {e}")