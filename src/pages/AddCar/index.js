import React from 'react'

import GridContentMain from '../../components/GridContentMain'
import FullMenu from '../../components/FullMenu'
import FormAddCar from '../../components/FormAddCar'

const AddCar = () => {
    return(
        <GridContentMain ComponentLeft={FullMenu} ComponentRight={FormAddCar} />
    )
}

export default AddCar;