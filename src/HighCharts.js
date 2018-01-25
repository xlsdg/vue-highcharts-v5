import HighCharts from 'highcharts';
import Wrapper from './wrapper.js';

const IHighCharts = Wrapper('charts', HighCharts);
IHighCharts.__highcharts__ = HighCharts;
export default IHighCharts;
