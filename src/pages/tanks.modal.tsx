import {ModalEnum} from "@/stores"
import {Badge, DateField, Icon, InputField, Modal, SelectField, TimePicker} from "@/widgets"
import {Field, Form, FormRenderProps} from "react-final-form"
import React from "react"
import {useModal} from "@/hooks"
import {motion} from "framer-motion"
import {useRecoilState} from "recoil"
import {selectedTanksAtom} from "@/stores/tanks"

type FormValues = {
  amount?: number
  size?: number | string
  feedTimes?: string[]
  sexual?: string
  birthday?: Date
  genotype?: string
  species?: string
  label?: string
}

const formRender = ({
                      handleSubmit,
                      form,
                      submitting,
                      pristine,
                      values
                    }: FormRenderProps<any, FormValues>) => <form onSubmit={handleSubmit}>
  <div className={"grid grid-cols-2 place-content-center gap-x-6 gap-y-5"}>
    <div className={"flex justify-between items-center"}>
      <div>amount</div>
      <Field name={"amount"} component={InputField}/>
    </div>
    <div className={"flex justify-between items-center"}>
      <div>size</div>
      <Field name={"size"} component={SelectField} options={[1.5, 3, 10, "maintain"]}/>
    </div>
    <div className={"flex justify-between items-center"}>
      <div>sexual</div>
      <Field name={"sexual"} component={SelectField} options={["male", "female", "unknown", "maintain"]}
             className={"w-48"}/>
    </div>
    <div className={"flex justify-between items-center"}>
      <div>genotype</div>
      <Field name={"genotype"} component={InputField}/>
    </div>
    <div className={"flex justify-between items-center"}>
      <div>species</div>
      <Field name={"species"} component={SelectField} options={[
        "Nothobranchius furzeri GRZ",
        "Nothobranchius eggersi Makurunge",
        "Nothobranchius derhami",
        "unset",
        "maintain"
      ]}/>
    </div>
    <div className={"flex justify-between items-center"}>
      <div>label</div>
      <Field name={"label"} component={InputField}/>
    </div>

  </div>

  <div className={"flex items-center my-5"}>
    <div>
      <div>birthday</div>
      <Field name={"birthday"} component={DateField}/>
    </div>
  </div>

  <div className={"flex items-center"}>
    <div>feeding times</div>
    <TimePicker/>
  </div>

  <div className={"flex justify-between space-x-6 px-24"}>
    <button
      type={"submit"}
      disabled={submitting}
      className={"w-full py-1.25 text-white bg-cyan-300 rounded-md"}>
      Submit
    </button>
    <button
      type="reset"
      onClick={form.reset}
      disabled={submitting || pristine}
      className={"w-full py-1.25 text-gray-500 border border-gray-300 rounded-md cursor-pointer"}
    >
      Reset
    </button>
  </div>
</form>


type Props = {
  onSubmit: (values: FormValues) => void
}

export const ModifyTankModal = ({
                                  onSubmit
                                }: Props) => {
  const {closeModal} = useModal()
  const [selected, setSelected] = useRecoilState(selectedTanksAtom)

  const handleCancel = (id: string) => {
    if (selected.length === 1) {
      setSelected([])
      closeModal()
    } else setSelected(prev => prev.filter(i => i != id))
  }

  return <Modal name={ModalEnum.TankBatchModify} className={"w-[650px]"}>
    <div>selected</div>
    <motion.div layout className={"grid grid-cols-5 place-content-center gap-x-1.5 gap-y-2 my-5"}>
      {selected && selected.map(d => <Badge key={d}>
        <span>{d}</span>
        <Icon name={"x"} role={"button"} onClick={() => handleCancel(d)} className={"size-5"}/>
      </Badge>)}
    </motion.div>

    <Form
      initialValues={{
        size: "maintain",
        sexual: "maintain",
        birthday: new Date(),
        genotype: "",
        species: "maintain",
        label: "",
      }}
      onSubmit={onSubmit}
      render={formRender}
    />
  </Modal>
}

export const AddTankModal = ({onSubmit}: Props) => {
  return <Modal name={ModalEnum.TankAdd} className={"w-[600px]"}>
    <Form
      initialValues={{
        size: "maintain",
        sexual: "maintain",
        birthday: new Date(),
        genotype: "",
        species: "maintain",
        label: "",
      }}
      onSubmit={onSubmit}
      render={formRender}
    />
  </Modal>
}