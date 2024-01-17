# coding: utf-8
import eel
import sys
from datetime import datetime
import time
import math

@eel.expose()
def saveSettings():
    start = time.perf_counter();
    date=datetime.now().strftime("save_%d%m%Y%H%M");
    #------------------------

    #------------------------
    print('saving initialized...');
    end = time.perf_counter();
    runtime=end-start;
    print(f'Done! in {runtime}s')

options = {
    'port': 3000,
	'mode': 'custom',
	'args': ['node_modules/electron/dist/electron.exe', '.']
}
if __name__ == '__main__':
    if sys.argv[1] == '--develop': eel.init('client'); eel.start(options, host="localhost", port=8888)
    else: eel.init('build'); eel.start('index.html');
