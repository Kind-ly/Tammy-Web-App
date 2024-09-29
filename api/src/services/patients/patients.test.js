import {
  patients,
  patient,
  createPatient,
  updatePatient,
  deletePatient,
} from './patients'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('patients', () => {
  scenario('returns all patients', async (scenario) => {
    const result = await patients()

    expect(result.length).toEqual(Object.keys(scenario.patient).length)
  })

  scenario('returns a single patient', async (scenario) => {
    const result = await patient({ id: scenario.patient.one.id })

    expect(result).toEqual(scenario.patient.one)
  })

  scenario('creates a patient', async () => {
    const result = await createPatient({
      input: { name: 'String', timezone: 'String' },
    })

    expect(result.name).toEqual('String')
    expect(result.timezone).toEqual('String')
  })

  scenario('updates a patient', async (scenario) => {
    const original = await patient({ id: scenario.patient.one.id })
    const result = await updatePatient({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a patient', async (scenario) => {
    const original = await deletePatient({
      id: scenario.patient.one.id,
    })
    const result = await patient({ id: original.id })

    expect(result).toEqual(null)
  })
})
