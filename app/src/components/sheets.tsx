import * as React from 'react';
import { useState } from 'react';
import { NextPage } from "next";
import Org from '../models/organization';
import { Sheet } from '../models/sheet';
import { getSheets } from '../services/sheetService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';

interface Props {
    org: Org,
    accessToken: string,
    config: any
}

const SheetsComponent: NextPage<Props> = ({ org, accessToken, config }) => {
    const [sheets, setSheets] = useState([]);

    React.useEffect(() => {
        if (sheets.length == 0 && accessToken) {
            getSheets(org.id, accessToken, config)
                .then((data: Sheet[]) => {
                    return data;
                })
                .then(setSheets);
        }
    }, [accessToken]);

    return (
        <Box margin={1}>
            <Typography variant="h6" gutterBottom component="div">
                Sheets
            </Typography>
            <Table size="small" aria-label="purchases">
                <TableHead>
                    <TableRow>
                        <TableCell>Label</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Creation date</TableCell>
                        <TableCell>Submittion date</TableCell>
                        <TableCell>Exported</TableCell>
                        <TableCell align="right">Total ($)</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sheets.map((sheet, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                {sheet.label}
                            </TableCell>
                            <TableCell>{sheet.status}</TableCell>
                            <TableCell>{sheet.creationDate}</TableCell>
                            <TableCell>
                                {sheet.submittedOn}
                            </TableCell>
                            <TableCell align="center">
                                <FontAwesomeIcon icon={sheet.exported ? faCheck : faTimes} />
                            </TableCell>
                            <TableCell align="right">
                                {sheet.total}
                            </TableCell>
                            <TableCell>
                                <Link href={{
                                    pathname: `/sheet/${sheet.id}`,
                                    query: { org: org.id }
                                }} passHref>Détails</Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
}

export default SheetsComponent;