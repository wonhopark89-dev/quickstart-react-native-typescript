## 애니메이션 메모
```
Animated 컴포넌트 만드는 방법(1) with styled-components
const Box1 = styled(Animated.createAnimatedComponent(TouchableOpacity))`
  background-color: tomato;
  width: 50px;
  height: 50px;
`;

Animated 컴포넌트 만드는 방법(2) with styled-components
const AnimatedBox = Animated.createAnimatedComponent(Box);

TouchableOpacity => 애니메이션이 자연스럽게 먹히지 않음
View, ScrollView 추천

Animated.Spring
Bounce 는 speed 와 같이 사용
friction 는 tension 와 같이 사용

useRef 사용해서, Animated 값이 리렌더링 후에도 유지할 수 있도록 보호한다.

Y.addListener(() => console.log("Animated State: " + JSON.stringify(Y))); // 애니메이션 value 보고 싶을때
console.log("Component State: " + JSON.stringify(Y)); // 리렌더링 되지 않음 ( Animation 이 react component 에서 실행된 것이 아님 )

useNativeDriver: true 일때 네이티브 실행 할수 없는 애니메이션도 있다, ( backgroundColor 같은 ),
useNativeDriver 를 false 로 하거나, 하는건 선택의 문제 ( 퍼포먼스 )

애니메이션 초기값 위치와 애니메이션 sequence 의 마지막 위치를 잘 계산해서 자연스럽게.
...POSITION.getTranslateTransform() => 축약

panResponder => dx, dy 사용가가 움직인 거리
dx,dy => 손가락을 떼면 다시 0 부터 시작

onPanResponderRelease : 터치가 끝났을 때 작동
POSITION.setValue({ x: 0, y: 0 }); // 애니메이션 없이 바로 이동해버림
Animated.spring(POSITION, {
    toValue: { x: 0, y: 0 },
    useNativeDriver: false,
}).start();

POSITION.setOffset({
    // 시작을 현재 위치에서  ( 0,0 이 아닌ㄷ )
    x: POSITION.x._value,
    y: POSITION.y._value,
});

interpolate 의 extraploate ( clamp 제한, extend 규칙대로 쭉이어감, identity ?? )
inputRange 의 범위를 벗어나는 부분 컨트롤
const rotation = position.interpolate({
    inputRange: [-250, 250],
    outputRange: ["-15deg", "15deg"],
    extrapolate: "clamp",
});

tension 값이 작을수록 속도가 느리다

restSpeedThreshold, restDisplacementThreshold
애니메이션이 끝나는 시간과 거리의 한계치를 파악해서 더 빠르게 종료시키도록 함( 반응이 빠르도록 )
restSpeedThreshold: 100,
restDisplacementThreshold:100

```
