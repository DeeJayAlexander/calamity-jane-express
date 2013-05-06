#!/bin/bash

echo "Content-type: text/plain"
echo ""


cat >cje1.xml

#find out which xml is saved, number 1 (xmla) or 2 (xmlb).
sed '
s/^\([1-9]\)\(.*\)$/\1/g
2,$ d' <cje1.xml >cje

#remove the number and sanitize output.
sed '
s/^\([1-9]*[[:space:]]*\)\(.*\)$/\2/g' <cje1.xml >cje2a.xml

#16-3
sed '
s/></>\n</g' <cje2a.xml >cje2.xml

sed '/^$/d' <cje2.xml >cje2a.xml

#which content must be saved in which file; don't forget r/w accessability for certain files.
case "`cat cje`" in
"1" ) cat cje2a.xml >/var/www/cjea.xml;;
"2" ) cat cje2a.xml >/var/www/cjeb.xml;;
esac

echo "All Saved."
  	
exit 0
