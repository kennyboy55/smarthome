import { LineData } from './line-data';
import { LabelData } from './label-data';

export class GraphData {
  public TOE1: LineData;
  public TOE2: LineData;
  public HOV: LineData;
  public TTE1: LineData;
  public TTE2: LineData;
  public HTV: LineData;
  public HT: LineData;
  public labels: LabelData;
}
