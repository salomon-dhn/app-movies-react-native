import React, {useRef, useEffect} from 'react';
import { Animated, Dimensions } from 'react-native';

function FadeIn (props){
    const positionLeft = useRef(new Animated.Value(Dimensions.get('window').width));    
    useEffect(()=>{
        Animated.spring(
            positionLeft,
            {
              toValue: 0
            }
          ).start();
    },[positionLeft]);
    return (
        <Animated.View
          style={{ 
            ...props.style, 
            left: positionLeft, }}>
              {props.children}
        </Animated.View>
      );
}

export default FadeIn;