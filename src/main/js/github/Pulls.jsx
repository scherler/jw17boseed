import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Alerts, JTable, TableHeaderRow, TableRow, TableCell, TextInput } from '@jenkins-cd/design-language';
import { GithubService } from '../services/GithubService';

const PullRow = ({pr}) => {
    return (
        <TableRow>
            <TableCell>{ pr.number }</TableCell>
            <TableCell>{ pr.title }</TableCell>
            <TableCell>{ pr.state }</TableCell>
            <TableCell>{ pr.user.login }</TableCell>
        </TableRow>
    );
};

@observer
export default class Pull extends Component {
    constructor(props) {
        super(props);
        this.service = new GithubService();
        this.service.getPulls();
    }
    render() {
        const { pulls = [], error } = this.service;
        const columns = [
            JTable.column(200, "Number"),
            JTable.column(200, "Title"),
            JTable.column(200, "State"),
            JTable.column(200, "User"),
        ];
        const rows = pulls.map((pull, index) =>(<PullRow pr={pull} id={index} />));
        const body = pulls.length === 0 ? (<div>no PRs</div>) : (<JTable columns={columns}>
            <TableHeaderRow />
            { rows }
        </JTable>);
        // return the component
        return (<div>
            <span>Set your repo:</span>&nbsp;
            <TextInput
                defaultValue={GithubService.getRepo()}
                placeholder="org/repo"
                disabled={false}
                onBlur={ text => {
                        GithubService.setRepo(text);
                        this.service.dismissError();
                        this.service.getPulls();
                    }
                }
                iconLeft="ActionSearch"
            />
            { error && <Alerts message={error.responseBody.message} type="Error" title="Error" /> }
            { body }
        </div>);
    }
}
Pull.propTypes = {
    repo: PropTypes.string,
};
