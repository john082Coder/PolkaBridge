import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";

import PercentLabel from "../../common/PercentLabel";
import { formatCurrency } from "../../../utils/helper";

function createData(id, name, price, price_change, vol_24_h, tvl) {
  return { id, name, price, price_change, vol_24_h, tvl };
}

const rows = [
  createData(1, "Ether", 2330, 2.74, 882.93, 573.84), // dataset contains coinName, currPrice, priceChange, Vol24H, TVL
  createData(2, "USD Coin", 1.0, 0.0, 529.2, 536.11),
  createData(3, "Tetcher USD", 1.0, -0.03, 162.22, 177.01),
  createData(4, "Polkabridge", 1.0, 0.0, 92.56, 131.58),
  createData(5, "Polkawar", 1.0, 0.0, 92.56, 131.58),
  createData(6, "Corgib", 1.0, 0.0, 92.56, 131.58),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "# Name",
  },
  { id: "price", numeric: true, disablePadding: false, label: "Price" },
  {
    id: "price_change",
    numeric: true,
    disablePadding: false,
    label: "Price Change",
  },
  {
    id: "vol_24_h",
    numeric: true,
    disablePadding: false,
    label: "Volume 24 H",
  },
  { id: "tvl", numeric: true, disablePadding: false, label: "TVL" },
];
const headCellMobile = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "# Name",
  },
  {
    id: "vol_24_h",
    numeric: true,
    disablePadding: false,
    label: "Volume 24 H",
  },
];

const useHeadStyles = makeStyles((theme) => ({
  headStyle: {
    color: "rgba(255,255,255,0.5)",
    margin: 0,
    padding: 0,
  },
  sortIcons: {
    opacity: 1,
    color: "rgba(255,255,255,0.5)",
  },
  desktop: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  mobile: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const ownClasses = useHeadStyles();
  console.log(window.innerWidth);

  return (
    <TableHead>
      <TableRow className={ownClasses.mobile}>
        <TableCell padding="checkbox"></TableCell>
        {headCellMobile.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            // style={{ color: "#E0077D" }}s
          >
            <TableSortLabel
              // active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              classes={{
                icon:
                  orderBy !== headCell.id
                    ? ownClasses.sortIcons
                    : ownClasses.sortIcons,
              }}
            >
              <p className={ownClasses.headStyle}>{headCell.label}</p>
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>

      <TableRow className={ownClasses.desktop}>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            // style={{ color: "#E0077D" }}s
          >
            <TableSortLabel
              // active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              classes={{
                icon:
                  orderBy !== headCell.id
                    ? ownClasses.sortIcons
                    : ownClasses.sortIcons,
              }}
            >
              <p className={ownClasses.headStyle}>{headCell.label}</p>
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      width: 370,
    },
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
    [theme.breakpoints.down("sm")]: {
      minWidth: 370,
    },
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  tableHeadText: {
    color: "white",
  },
  cellText: {
    color: "white",
  },
  tableDesktop: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  tableMobile: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

const TopTokens = () => {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    console.log("sort ", property);
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    console.log("ordering...");
    // const selectedIndex = selected.indexOf(name);
    // let newSelected = [];

    // if (selectedIndex === -1) {
    //   newSelected = newSelected.concat(selected, name);
    // } else if (selectedIndex === 0) {
    //   newSelected = newSelected.concat(selected.slice(1));
    // } else if (selectedIndex === selected.length - 1) {
    //   newSelected = newSelected.concat(selected.slice(0, -1));
    // } else if (selectedIndex > 0) {
    //   newSelected = newSelected.concat(
    //     selected.slice(0, selectedIndex),
    //     selected.slice(selectedIndex + 1)
    //   );
    // }

    // setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <div className="card-theme">
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <>
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.name)}
                        //   role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                        className={classes.tableMobile}
                      >
                        <TableCell padding="checkbox"></TableCell>

                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          <span className={classes.cellText}>{row.name}</span>
                        </TableCell>

                        <TableCell align="right" className={classes.cellText}>
                          {formatCurrency(row.vol_24_h, true)}
                        </TableCell>
                      </TableRow>

                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.name)}
                        //   role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                        className={classes.tableDesktop}
                      >
                        <TableCell padding="checkbox"></TableCell>

                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          <span className={classes.cellText}>{row.name}</span>
                        </TableCell>
                        <TableCell align="right">
                          <span className={classes.cellText}>
                            {formatCurrency(row.price, true)}
                          </span>
                        </TableCell>
                        <TableCell align="right" className={classes.cellText}>
                          <PercentLabel percentValue={row.price_change} />
                        </TableCell>
                        <TableCell align="right" className={classes.cellText}>
                          {formatCurrency(row.vol_24_h, true)}
                        </TableCell>
                        <TableCell align="right" className={classes.cellText}>
                          {formatCurrency(row.tvl, true)}
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          style={{ color: "#E0077D" }}
        />
      </div>
    </div>
  );
};

export default TopTokens;
