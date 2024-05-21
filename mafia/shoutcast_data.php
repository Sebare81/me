<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header("Access-Control-Max-Age: 100000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");

header('Content-type: application/json');
if(isset($_POST['ip'])){
$ips = $_POST['ip'];
$ports = $_POST['port'];
//$page = $_SERVER['PHP_SELF'];
//$sec = $time;
//header("Refresh: $sec; url=$page");

class shoutcast2stats {
    private $_ip;
    private $_port;
    private $_sid;
    private $_json;
 
    public function __construct($ip, $port, $sid=1)
    {
        $this->_ip = $ip;
        $this->_port = $port;
        $this->_sid = $sid;
        $this->initCurl();
    }
 
    private function initCurl()
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'http://'.$this->_ip.':'.$this->_port.'/stats?sid='.$this->_sid.'&json=1');
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (PortalRadiowy.pl)');
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 3);
        $curl_exec = curl_exec($ch);
        $this->_json = ($curl_exec ? json_decode(iconv('UTF-8', 'UTF-8//IGNORE', $curl_exec)) : false);
        curl_close($ch);
    }
   
    public function get($name, $name_dj='')
    {
        if ($name == 'streamstatus') {
            if ($this->_json == false) {
                return 0;
            } elseif ($this->_json->streamstatus == 0) {
                return 1;
            } else {
                return 2;
            }
        } elseif (isset($this->_json->$name) && $name == 'dj' && !empty($name_dj)) {
            $dj_json = json_decode(substr(preg_replace('/\},[\s]*\{/', ',', preg_replace(array('/\([\s]*"/', '/"[\s]*\)/', '/"[\s]*,/'), array('{"', '"}', '":'), preg_replace_callback('/\\\\(\d+)/m', function($matches) { return iconv('Windows-1250', 'UTF-8//IGNORE', chr($matches[1])); }, $this->_json->dj))), 1, -1));
            if (isset($dj_json->$name_dj)) {
                return htmlspecialchars($dj_json->$name_dj);
            }
        } elseif (isset($this->_json->$name)) {
            return htmlspecialchars($this->_json->$name);
        }
        return '';
    }
}
$stats = new shoutcast2stats($ips, $ports);

echo json_encode(array('VERSION'=> (int) $stats->get('version'),'STREAMSTATUS'=> (int) $stats->get('streamstatus'),'CURRENTLISTENERS'=> (int) $stats->get('currentlisteners'),'UNIQUELISTENERS'=> (int) $stats->get('uniquelisteners'),'MAXLISTENERS'=> (int) $stats->get('maxlisteners'),'PEAKLISTENERS'=> (int) $stats->get('peaklisteners'),'AVERAGETIME'=> (int) $stats->get('averagetime'),'BITRATE'=> (int) $stats->get('bitrate'),'CONTENT'=> $stats->get('content'),'SERVERTITLE'=> $stats->get('servertitle'),'SERVERGENRE'=> $stats->get('servergenre'),'SERVERURL'=> $stats->get('serverurl'),'SONGTITLE'=> $stats->get('songtitle'),'DJ'=> ''));
}