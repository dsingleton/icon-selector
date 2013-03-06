#!/usr/bin/python

import os, glob, json

icons = json.dumps([os.path.basename(icon) for icon in glob.glob('icons/*.png')])
open('js/icon_data.js', 'w').write('var icon_data = ' + icons)

