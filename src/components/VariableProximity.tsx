import { forwardRef, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import './VariableProximity.css';

function useAnimationFrame(callback: () => void) {
  useEffect(() => {
    let frameId: number;
    const loop = () => {
      callback();
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [callback]);
}

function useMousePositionRef(containerRef: React.RefObject<HTMLDivElement | null>) {
  const positionRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const updatePosition = (x: number, y: number) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positionRef.current = { x: x - rect.left, y: y - rect.top };
      } else {
        positionRef.current = { x, y };
      }
    };

    const handleMouseMove = (ev: MouseEvent) => updatePosition(ev.clientX, ev.clientY);
    const handleTouchMove = (ev: TouchEvent) => {
      const touch = ev.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [containerRef]);

  return positionRef;
}

interface VariableProximityProps {
  label: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
  radius?: number;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>((props, ref) => {
  const {
    label,
    containerRef,
    radius = 200,
    className = '',
    onClick,
    style,
  } = props;

  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const mousePositionRef = useMousePositionRef(containerRef);
  const lastPositionRef = useRef({ x: -9999, y: -9999 });

  const calculateDistance = (x1: number, y1: number, x2: number, y2: number) =>
    Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  useAnimationFrame(() => {
    if (!containerRef?.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const { x, y } = mousePositionRef.current;
    
    if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) {
      return;
    }
    lastPositionRef.current = { x, y };

    letterRefs.current.forEach((letterRef) => {
      if (!letterRef) return;

      const rect = letterRef.getBoundingClientRect();
      const letterCenterX = rect.left + rect.width / 2 - containerRect.left;
      const letterCenterY = rect.top + rect.height / 2 - containerRect.top;

      const distance = calculateDistance(x, y, letterCenterX, letterCenterY);

      if (distance >= radius) {
        letterRef.style.color = 'inherit';
        letterRef.style.textShadow = 'none';
        letterRef.style.transform = 'scale(1)';
        return;
      }

      const falloffValue = Math.max(1 - distance / radius, 0);
      
      // 颜色从白色变为绿色
      const greenIntensity = Math.round(255 * falloffValue);
      const color = `rgb(${255 - greenIntensity}, 255, ${200 - Math.round(greenIntensity * 0.2)})`;
      
      // 发光效果
      const glowIntensity = falloffValue * 30;
      const glowColor = `rgba(34, 197, 94, ${falloffValue * 0.8})`;
      const textShadow = `0 0 ${glowIntensity}px ${glowColor}, 0 0 ${glowIntensity * 2}px ${glowColor}`;
      
      // 缩放效果
      const scale = 1 + falloffValue * 0.15;

      letterRef.style.color = color;
      letterRef.style.textShadow = textShadow;
      letterRef.style.transform = `scale(${scale})`;
    });
  });

  // 将标签拆分为字符，包括中文
  const chars = label.split('');

  return (
    <span
      ref={ref}
      className={`${className} variable-proximity`}
      onClick={onClick}
      style={{ display: 'inline', ...style }}
    >
      {chars.map((char, index) => (
        <motion.span
          key={index}
          ref={el => {
            letterRefs.current[index] = el;
          }}
          style={{
            display: 'inline-block',
            transition: 'color 0.1s ease, text-shadow 0.1s ease, transform 0.1s ease',
          }}
          aria-hidden="true"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
      <span className="sr-only">{label}</span>
    </span>
  );
});

VariableProximity.displayName = 'VariableProximity';
export default VariableProximity;
