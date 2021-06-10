import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Hidden from "@material-ui/core/Hidden";

import BarChartSample from "./BarChartSample";
import LineChartSample from "./LineChartSample";
import ResponsiveTable from "./ResponsiveTableSample";

import source from "./data/source";
// import sidoKorName from "./data/sidoKorName";
import bardata from "./data/bardata";
import linedata from "./data/linedata";
import tabledata from "./data/tabledata";

const useStyles = makeStyles((theme) => ({
  // 내부 페이퍼에 스타일을 지정
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  // 화면이 1280px 이상이면 그리드 컨테이너 위쪽에 마진을 줌.
  container: {
    [theme.breakpoints.up("lg")]: {
      marginTop: "80px",
    },
  },
}));

const transformSidoData = (source) => {
  return bardata;
};

const transformLocationData = (source, sido) => {
  return linedata;
};

const transformSidoTableData = (source) => {
  return tabledata;
};

const Home = () => {
  const classes = useStyles();

  const sidoData = transformSidoData(source);
  const locationData = transformLocationData(source, "seoul");
  const sidoTableData = transformSidoTableData(source.slice(0, 8));

  return (
    // Grid 컨테이너 선언
    // spacing: Grid Item(내부요소) 들의 띄어쓰기
    <Grid container spacing={3} className={classes.container}>
      {/* Grid 아이템 선언 lg사이즈 이상일 때 2칸 */}
      {/* item 공간 핪이 12개가되면 다음행으로 넘어감 */}
      {/* 1행 */}
      <Hidden mdDown>
        <Grid item lg={1} />
      </Hidden>
      <Grid item xs={12} sm={7} lg={6}>
        <Paper className={classes.paper} style={{ height: "25vh" }}>
          <h3>시도별 미세먼지 현재 현황</h3>
          <BarChartSample data={sidoData} />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={5} lg={4}>
        <Paper className={classes.paper} style={{ height: "25vh" }}>
          <h3>서울 미세먼지 현황</h3>
          <LineChartSample data={locationData} />
        </Paper>
      </Grid>
      <Hidden mdDown>
        <Grid item lg={1} />
      </Hidden>
      <Hidden mdDown>
        <Grid item lg={1} />
      </Hidden>
      <Grid item xs={12} sm={12} lg={10}>
        <Paper className={classes.paper}>
          <h3>시도별 미세먼지 이력</h3>
          <ResponsiveTable data={sidoTableData} />
        </Paper>
      </Grid>
      <Hidden mdDown>
        <Grid item lg={1} />
      </Hidden>
    </Grid>
  );
};
export default Home;
