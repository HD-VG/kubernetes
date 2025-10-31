import { AnswerQuery } from './answerQuery.interface';

export interface DataMaps {
    id?:                    number;
    code_custody?:          string;
    laboratoryMB?:          string;
    laboratoryFQ?:          string;
    code_thermohygrometer?: string;
    code_thermometer_m_m?:  string;
    code_thermometer?:      string;
    code_colorimeter?:      string;
    samplings?:             Sampling[];
    start_date_transport?:  string;
    end_date_transport?:    string;
    start_time_transport?:  string;
    end_time_transport?:    string;
    transport_responsable?: string;
}

export interface Sampling {
    id?:                   number;
    sample_code?:          string;
    description?:          string;
    source_of_supply?:     string;
    quantity?:             number;
    sample_location?:      string;
    sample_point?:         string;
    coordinates?:          Coordinates;
    sampling_technique?:   string;
    sampling_technique_m?: string;
    ci_res_a?:             string;
    ci_res_b?:             string;
    cond_amb_t?:           string;
    cond_amb_h?:           string;
    sampling_day?:         Date;
    sampling_time?:        string;
}

export interface Coordinates {
    lat?: string;
    lng?: string;
}
export interface MapsReportQuery extends AnswerQuery<DataMaps[]> { }
