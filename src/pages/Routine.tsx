const todoList = [
  "饲喂幼鱼（上午）",
  "饲喂成年鱼（上午）",
  "添加脚垫消毒液",
  "收集丰年虫（上午）",
  "孵化丰年虫（上午）",
  "检查制水间溶液缸",
  "检查独立系统溶液缸",
  "检查PH、电导率",
  "更换过滤棉",
  "地面清洁（周二）",
  "地面消毒（周五）",
  "收集丰年虫（下午）",
  "孵化丰年虫（下午）",
  "饲喂幼鱼（下午）",
  "饲喂成年鱼（下午）",
  "检查鱼缸水流速度",
  "新生鳉鱼数量",
  "处死鳉鱼数量",
  "当前系统内鳉鱼数量",
  "鱼房启用后全部鳉鱼数量"
]

export const Routine = () => {
  return <div className={"w-4/5 mx-auto"}>
   <h2 className={"text-xl font-medium text-gray-600"}>To be completed</h2>
    <div className={"grid grid-cols-3 gap-y-3 place-content-center"}>
      {todoList.slice(0,10).map(d =>
        <div key={d} className={"flex items-center"}>
          <input type={"checkbox"} className={"rounded-sm border-gray-500/90"}/>
          <div className={"px-3 py-1.5 font-medium text-gray-500"}>
            {d}
          </div>
        </div>)}
    </div>

    <h2 className={"text-xl font-medium text-gray-600"}>Completed</h2>
    <div className={"grid grid-cols-3 gap-y-3 place-content-center"}>
      {todoList.slice(10).map(d =>
        <div key={d} className={"flex items-center"}>
          <input type={"checkbox"} className={"rounded-sm border-gray-500/90"}/>
          <div className={"px-3 py-1.5 font-medium text-gray-500"}>
            {d}
          </div>
        </div>)}
    </div>
  </div>
}
