import React from 'react'

import GridContentMain from '../../components/GridContentMain'
import FullMenu from '../../components/FullMenu'
import FormUpdateBrand from '../../components/FormUpdateBrand'

const UpdateBrand = () => {
    return(
        <GridContentMain ComponentLeft={FullMenu} ComponentRight={FormUpdateBrand} />
    )
}
export default UpdateBrand;