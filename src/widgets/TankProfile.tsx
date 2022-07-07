type Props = {
  tank: Tank
}

export const TankProfile = ({
                              tank: {
                                id,
                                owner,
                                sexual,
                                genotype,
                                species,
                                size,
                                amount,
                                birthday,
                                feedTimes,
                                label
                              }
                            }: Props) => {

  return <>
    <div className={"grid grid-cols-2"}>

      <div>
        <h2>Basic Info</h2>
      </div>

      <div>
        tank id: <span className={"font-semibold"}>{id}</span>
      </div>
      <div>
        owner: <span className={"font-semibold"}>{owner}</span>
      </div>
      <div>
        feed times: <div className={"space-x-0.5"}>
        {feedTimes?.map(d => <span key={d} className={"px-1 py-0.5 text-white bg-purple-300 rounded-sm"}>{d}</span>)}
      </div>
      </div>
      <div>
        genotype: <span className={"px-1 py-0.5 text-white bg-purple-300 rounded-sm"}>{genotype}</span>
      </div>
      <div>
        sexual: <span className={"px-1 py-0.5 text-white bg-purple-300 rounded-sm"}>{sexual}</span>
      </div>
      <div>
        species: <span className={"font-semibold"}>{species}</span>
      </div>
      <div>
        birthday: <span>{birthday}</span>
      </div>
      <div>
        size: <span className={"font-semibold"}>{size}</span>
      </div>
      <div>
        amount: <span className={"font-semibold"}>{amount}</span>
      </div>
      <div>
        label: <span className={"font-semibold"}>{label}</span>
      </div>

      <div>
        <h2>Additional Info</h2>
      </div>
    </div>
  </>
}
