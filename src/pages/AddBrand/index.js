import React from 'react'

import GridContentMain from '../../components/GridContentMain'
import FormAddBrand from '../../components/FormAddBrand'
import FullMenu from '../../components/FullMenu'

const AddBrand = () => {
    return(
        <GridContentMain ComponentLeft={FullMenu} ComponentRight={FormAddBrand} />
    )
}

export default AddBrand;