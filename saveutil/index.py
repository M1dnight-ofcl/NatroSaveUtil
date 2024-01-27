# coding: utf-8
from datetime import (datetime)
from pathlib import (Path)
import eel, sys, time, math, shutil, requests, os

#save func
@eel.expose()
def saveSettings():
    #for preformance monitoring
    start=time.perf_counter();
    name=f"save_{datetime.now().strftime('%d%m%Y%H%M')}";
    print('saving initialized...');
    #------------------------
    print('> archiving...');
    path=str(Path(__file__).resolve().parents[1])+"\\settings\\";
    shutil.copytree(path,f'./{name}');
    shutil.make_archive(
        f'./{name}','zip',
        f'./{name}');
    print('> saving file (".natro_sb")');
    with Path(f'./{name}.zip') as p:
        p.rename(p.with_suffix('.natro_sb'));
    shutil.rmtree(f'./{name}');
    npath=str(Path(__file__).resolve().parents[1])+"\\settings_backups\\";
    npfile=f"{npath}{name}.natro_sb";
    file=Path(f'./{name}.natro_sb');
    # print(f'> checking path existance: "{npath}"');
    # if not os.path.exists(npath):
    #     os.makedirs(npath);
    print(f'> moving file: {file} => {npfile}');
    file.rename(npfile);
    #------------------------
    end = time.perf_counter();
    runtime=end-start;
    print(f'Done! in {runtime}s');

@eel.expose()
def getDir():
    npath=str(Path(__file__).resolve().parents[1])+"\\settings_backups\\";
    dir=os.listdir(npath);
    print(dir);
    return dir;

withElectron = {
    'port': 3000,
	'mode': 'custom',
	'args': ['node_modules/electron/dist/electron.exe', '.']
}

#------------------
#! did not work :<
#! withChrome = {
#!     'port': 3000,
#! 	'mode': 'chrome',
#! 	'cmdline_args': ['--kiosk']
#! }
#------------------

if __name__ == '__main__':
    if sys.argv[1] == '--develop': 
        eel.init('client',allowed_extensions=['.js', '.html']); 
        eel.start(withElectron, host="localhost", port=8888);
    else: eel.init('build', allowed_extensions=['.js', '.html']); eel.start('index.html');
