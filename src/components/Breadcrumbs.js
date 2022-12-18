import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';


const BasicBreadcrumbs = ({ props }) => {
    return (
        <div role="presentation" id={"navbar"} className={"navbar"}>
            <Breadcrumbs aria-label="breadcrumb">
                {props.map((item, index) => {
                    if (index !== props.length - 1) {
                        return (
                            <Link key={index} underline={"hover"} color={"inherit"} href={item.ref}>{item.text}</Link>
                        )
                    }
                })}
                <Typography color="text.primary">{props[props.length - 1].text}</Typography>
            </Breadcrumbs>
        </div>
    );
}

export default BasicBreadcrumbs