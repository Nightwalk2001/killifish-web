import {ModalEnum, selectedTanksAtom} from "@/stores"
import {Badge, DateField, Icon, InputField, Modal, SelectField, TimeField} from "@/widgets"
import {Field, Form, FormRenderProps} from "react-final-form"
import React from "react"
import {useModal} from "@/hooks"
import {motion} from "framer-motion"
import {useRecoilState} from "recoil"
import arrayMutators from "final-form-arrays"
import {FieldArray} from "react-final-form-arrays"

const sizes   = [1.5, 3, 10],
      sexuals = [
        "male", "female", "unset"
      ],
      species = [
        "Nothobranchius furzeri GRZ",
        "Nothobranchius eggersi Makurunge",
        "Nothobranchius derhami",
        "unset"
      ]

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

type RenderProps = FormRenderProps<any, FormValues>

const formRender = ({
                      handleSubmit,
                      form: {
                        mutators: {push, pop},
                        reset
                      },
                      submitting,
                      pristine,
                      values
                    }: RenderProps,
                    batch    = true,
                    isUpdate = false
) => <form onSubmit={handleSubmit}>
  <div className={"grid grid-cols-2 place-content-center gap-x-6 gap-y-5"}>
    {!batch &&
      <div className={"flex justify-between items-center"}>
        <div>tank id</div>
        <Field name={"id"} component={InputField} upper={true} readOnly={isUpdate}/>
      </div>}
    <div className={"flex justify-between items-center"}>
      <div>amount</div>
      <Field name={"amount"} component={InputField}/>
    </div>
    <div className={"flex justify-between items-center"}>
      <div>size</div>
      <Field
        name={"size"}
        component={SelectField}
        options={batch ? [...sizes, "maintain"] : sizes}
      />
    </div>
    <div className={"flex justify-between items-center"}>
      <div>sexual</div>
      <Field
        name={"sexual"}
        component={SelectField}
        options={batch ? [...sexuals, "maintain"] : sexuals}
      />
    </div>
    <div className={"flex justify-between items-center"}>
      <div>genotype</div>
      <Field name={"genotype"} component={InputField}/>
    </div>
    <div className={"flex justify-between items-center"}>
      <div>species</div>
      <Field
        name={"species"}
        component={SelectField}
        options={batch ? [...species, "maintain"] : species}
      />
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
  <button
    type="button"
    onClick={() => push("feedTimes", undefined)}
  >
    Add Customer
  </button>
  <div className={"h-20 mb-4 overflow-y-scroll"}>
    <div>feeding times</div>
    <FieldArray name="feedTimes">
      {({fields}) =>
        <div className={"grid grid-cols-5"}>
          {
            fields.map((name, i) => <div
              key={name}
              className={"flex items-center"}>
              <Field
                name={name}
                component={TimeField}
              />
              <Icon
                name={"x"}
                role={"button"}
                className={"size-6 text-gray-600"}
                onClick={() => fields.remove(i)}/>
            </div>)
          }
        </div>
      }
    </FieldArray>
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
      onClick={reset}
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

export const TankBatchUpdateModal = ({onSubmit}: Props) => {
  const {closeModal} = useModal()
  const [selected, setSelected] = useRecoilState(selectedTanksAtom)

  const handleCancel = (id: string) => {
    if (selected.length === 1) {
      setSelected([])
      closeModal()
    } else setSelected(prev => prev.filter(i => i != id))
  }

  return <Modal name={ModalEnum.TankBatchUpdate} className={"w-[650px]"}>
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
        feedTimes: []
      }}
      mutators={{...arrayMutators}}
      onSubmit={onSubmit}
      render={formRender}
    />
  </Modal>
}

export const TankUpdateModal = ({onSubmit}: Props) => {
  const {param} = useModal<Tank>()
  return <Modal name={ModalEnum.TankUpdate} className={"w-[600px]"}>
    <Form
      initialValues={{
        id: param?.id ?? undefined,
        size: param?.size ?? 1.5,
        amount: param?.amount ?? "",
        sexual: param?.sexual ?? "unset",
        birthday: param?.birthday
          ? Date.parse(param?.birthday)
          : null
          ?? new Date(),
        genotype: param?.genotype ?? "",
        species: param?.species ?? "",
        label: param?.label ?? "",
      }}
      mutators={{...arrayMutators}}
      onSubmit={onSubmit}
      render={props => formRender(props, false, !!param?.id)}
    />
  </Modal>
}
