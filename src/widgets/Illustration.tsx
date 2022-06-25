import Lottie from "lottie-web"
import {HTMLProps, memo, useEffect, useRef} from "react"

type Props = {
  animation: any
} & HTMLProps<HTMLDivElement>


export const Illustration = memo(({animation, ...rest}: Props) => {
  const animationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (animationRef.current) Lottie.loadAnimation<"canvas">({
      animationData: animation,
      container: animationRef.current,
      autoplay: true,
      loop: true,
    })
  }, [])

  return <div ref={animationRef} {...rest}/>
})
