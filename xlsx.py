import openpyxl
from openpyxl import load_workbook
import sys
wb = load_workbook(filename = '/Users/hanukoon/Desktop/nota-paper.xlsx')
sheet = wb.active

sheet["L7"] = sys.argv[1] #한글성이름
# sheet["w7"] = sys.argv[2] #영문이름
# sheet["j10"] = sys.argv[3] #생년
# sheet["m10"] = sys.argv[4] #생원
# sheet["o10"] = sys.argv[5] #생일
# sheet["z10"] = sys.argv[6] #성별
# sheet["j10"] = sys.argv[7] #전화번호 앞
# sheet["m10"] = sys.argv[8] #전화번호중간
# sheet["p10"] = sys.argv[9] #전화번호 끝
wb.save("sample.xlsx")