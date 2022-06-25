import {motion} from "framer-motion"

type Props = Tank & { index: number }

export const TankCard = ({id, owner, amount, label, sexual, birthday, genotype, index}: Props) => {
  return <motion.div
    animate={{opacity: [0.4, 1]}}
    transition={{duration: 0.01, delay: 0.0103 * index}}
    className={"px-2 py-1.5 text-white bg-indigo-300 rounded-md"}>
    <div>鱼缸编号：{id}</div>
    <div>所有者：{owner}</div>
    <div>鳉鱼数量：{amount}</div>
    {label && <div>标签：{label}</div>}
    {sexual && <div>性别：{sexual}</div>}
    {birthday && <div>出生日期：{birthday}</div>}
    {genotype && <div>基因型：{genotype}</div>}
  </motion.div>
}
