import React from 'react'
import TextField from '@material-ui/core/TextField'
import { useConcent } from 'concent'
import _ from 'lodash'
import { useSnackbar } from 'notistack'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { UPLOAD } from '../../utils/customAxios'
import { useHistory } from 'react-router-dom'
import Editor from '@component/Editor'

export default () => {
    const ctx = useConcent()
    const { sync } = ctx
    const { enqueueSnackbar } = useSnackbar()
    const history = useHistory()
    ctx.setGlobalState({
        testValue: '',
    })
    return (
        <div>
            <Editor/>
            <TextField value={ctx.state.testValue} onChange={sync('testValue')}></TextField>
            <Typography variant="h1">{ctx.state.testValue}</Typography>
            <Button onClick={() => enqueueSnackbar('test')}>show Toast</Button>
            <Button onClick={() => history.push('/')}>to index</Button>
            <input
                accept="*"
                style={{ display: 'none' }}
                id="contained-button-file"
                multiple
                type="file"
                onChange={(e) => {
                    let data = new FormData()
                    data.append('file', e.target.files[0])
                    data.append('test0', 'test1')
                    UPLOAD({
                        url: 'test.com/123',
                        data,
                    })
                }}
            />
            <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                    Upload
                </Button>
            </label>
        </div>
    )
}
