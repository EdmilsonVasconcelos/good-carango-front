import React from 'react'

import GridContentMain from '../../components/GridContentMain'
import SimpleMenu from '../../components/SimpleMenu'
import FormAddUser from '../../components/FormAddUser'

const RegisterUser = () => {
    return(
        <GridContentMain ComponentLeft={SimpleMenu} ComponentRight={FormAddUser} />
    )
}

export default RegisterUser;