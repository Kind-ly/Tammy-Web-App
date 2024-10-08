import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import DeviceForm from 'src/components/Device/DeviceForm'

export const QUERY = gql`
  query EditDeviceById($id: Int!) {
    device: device(id: $id) {
      id
      careGiverId
    }
  }
`

const UPDATE_DEVICE_MUTATION = gql`
  mutation UpdateDeviceMutation($id: Int!, $input: UpdateDeviceInput!) {
    updateDevice(id: $id, input: $input) {
      id
      careGiverId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ device }) => {
  const [updateDevice, { loading, error }] = useMutation(
    UPDATE_DEVICE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Device updated')
        navigate(routes.devices())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateDevice({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Device {device?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <DeviceForm
          device={device}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
