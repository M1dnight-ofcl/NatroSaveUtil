# coding: utf-8
import eel
import sys
from datetime import datetime
import time
import math
import shutil
from pathlib import Path
import requests

#save func
@eel.expose()
def saveSettings():
    #for preformance monitoring
    start = time.perf_counter();
    name=f"save_{datetime.now().strftime('%d%m%Y%H%M')}";
    print('saving initialized...');
    #------------------------
    print('> archiving...');
    shutil.make_archive(
        f'./{name}','zip',
        Path(__file__).resolve().parents[1],
        './settings');
    print('> saving file (".natro_sb")');
    with Path(f'./{name}.zip') as p: p.rename(p.with_suffix('.natro_sb'));
    #------------------------
    end = time.perf_counter();
    runtime=end-start;
    print(f'Done! in {runtime}s');

options = {
    'port': 3000,
	'mode': 'custom',
	'args': ['node_modules/electron/dist/electron.exe', '.']
}
if __name__ == '__main__':
    if sys.argv[1] == '--develop': 
        eel.init('client',allowed_extensions=['.js', '.html']); 
        eel.start(options, host="localhost", port=8888);
    else: eel.init('build', allowed_extensions=['.js', '.html']); eel.start('index.html');
