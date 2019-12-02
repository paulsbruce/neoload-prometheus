var index = context.variableManager.getValue("vectors_loop_counter");
var json = context.variableManager.getValue("vectors_"+index);

function getPathValue(path) {
    var value = com.jayway.jsonpath.JsonPath.read(com.jayway.jsonpath.Configuration.defaultConfiguration().jsonProvider().parse(json), path);
    return value
}

var data = {}

var value = getPathValue("$.value[0]")
var ts = getPathValue("$.value[1]")
var service = getPathValue("$.metric.service")
var pod_name = getPathValue("$.metric.pod_name")
var node = getPathValue("$.metric.node")
var namespace = getPathValue("$.metric.namespace")
var endpoint = getPathValue("$.metric.endpoint")
var job = getPathValue("$.metric.job")
var metric_name = getPathValue("$.metric.__name__")
var container_name = getPathValue("$.metric.container_name")

var external_data_path = [namespace, service, pod_name, endpoint, container_name, metric_name].join("|")

logger.info('external_data_path: ' + external_data_path)
logger.info('value: ' + value)

context.variableManager.setValue("external_data_path",external_data_path)
context.variableManager.setValue("metric_value",value);

/*
metric: {
service: "prometheus-k8s-kubelet",
pod_name: "ps-weblogic-managed-node-8cbfdf955-lj7f9",
pod: "ps-weblogic-managed-node-8cbfdf955-lj7f9",
node: "us01plk8sw026.saas-n.com",
namespace: "lsm-pf1",
name: "k8s_POD_ps-weblogic-managed-node-8cbfdf955-lj7f9_lsm-pf1_0e6ccb13-1505-4059-be5e-6e4338513d84_0",
job: "kubelet",
instance: "10.226.235.56:10250",
image: "k8s.gcr.io/pause:3.1",
id: "/kubepods/burstable/pod0e6ccb13-1505-4059-be5e-6e4338513d84/676c0c5f691d2cc1bcc474c83e33f47d1cc6fedd21d2238a3a060753639d46cb",
endpoint: "https-metrics",
container_name: "POD",
container: "POD",
__name__: "container_memory_usage_bytes"
}
*/